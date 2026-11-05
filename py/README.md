# Frankfurter Python SDK



The Python SDK for the Frankfurter API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Coverage()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/SanderSaxBuilds/frankfurter-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from frankfurter_sdk import FrankfurterSDK

client = FrankfurterSDK()
```

### 3. Load a rate

Rate is nested under base, so provide the `base`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    rate = client.Rate().load({"base": "example_base", "quote": "example_quote"})
    print(rate.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    currencys = client.Currency().list()
    print([item.data_get() for item in currencys])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = FrankfurterSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
currency = client.Currency().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = FrankfurterSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FRANKFURTER_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### FrankfurterSDK

```python
from frankfurter_sdk import FrankfurterSDK

client = FrankfurterSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = FrankfurterSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### FrankfurterSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Coverage` | `(data) -> CoverageEntity` | Create a Coverage entity instance. |
| `Currency` | `(data) -> CurrencyEntity` | Create a Currency entity instance. |
| `Provider` | `(data) -> ProviderEntity` | Create a Provider entity instance. |
| `Rate` | `(data) -> RateEntity` | Create a Rate entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Coverage

| Field | Description |
| --- | --- |
| `base` | Requested base currency, EUR by default |
| `end_date` | Last eligible observation date with a nonempty matching rates query |
| `providers` | Selected providers, or null for the default daily blend |
| `quotes` | Requested quotes, or null for all |
| `start_date` | First eligible observation date with a nonempty matching rates query |

Operations: Load.

API path: `/coverage`

#### Currency

| Field | Description |
| --- | --- |
| `end_date` | Latest publication coverage date; use /coverage for queryable pairs |
| `iso_code` | Currency or accounting unit code |
| `iso_numeric` | ISO 4217 numeric code |
| `name` | Full currency name |
| `peg` | Peg metadata, present only for pegged currencies |
| `providers` | Provider keys that publish this currency |
| `start_date` | Earliest publication coverage date; use /coverage for queryable pairs |
| `symbol` | Currency symbol |

Operations: List, Load.

API path: `/currencies`

#### Provider

| Field | Description |
| --- | --- |
| `country_code` | ISO 3166-1 alpha-2 country code |
| `currencies` | Recognised currency codes within their valid date ranges covered by this provider |
| `data_url` | Link to the data source |
| `end_date` | Latest publication coverage date; use /coverage for queryable pairs |
| `frequency` | The period each observation stands for, after SDMX FREQ. |
| `key` | Provider identifier |
| `name` | Full provider name |
| `pivot_currency` | Base currency for published rates |
| `publish_cadence` | How often the provider publishes rates. |
| `publishes_missed` | Number of expected publishes missed since end_date, in units of publish_cadence. |
| `rate_type` | Official rate type as used by the source |
| `start_date` | Earliest publication coverage date; use /coverage for queryable pairs |
| `terms_url` | Link to terms of use |
| `unknown_currencies` | Unreviewed published codes absent from the currency registry. |

Operations: List, Load.

API path: `/providers`

#### Rate

| Field | Description |
| --- | --- |
| `base` | Base currency or accounting unit code |
| `date` | The date of the rate |
| `id` |  |
| `providers` | Per-provider rates for this pair. |
| `quote` | Quote currency or accounting unit code |
| `rate` | Exchange rate value |

Operations: List, Load.

API path: `/providers/{provider}/rates`



## Entities


### Coverage

Create an instance: `coverage = client.Coverage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `str` | Requested base currency, EUR by default |
| `end_date` | `str | None` | Last eligible observation date with a nonempty matching rates query |
| `providers` | `list | None` | Selected providers, or null for the default daily blend |
| `quotes` | `list | None` | Requested quotes, or null for all |
| `start_date` | `str | None` | First eligible observation date with a nonempty matching rates query |

#### Example: Load

```python
coverage = client.Coverage().load()
```


### Currency

Create an instance: `currency = client.Currency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end_date` | `str | None` | Latest publication coverage date; use /coverage for queryable pairs |
| `iso_code` | `str` | Currency or accounting unit code |
| `iso_numeric` | `str | None` | ISO 4217 numeric code |
| `name` | `str` | Full currency name |
| `peg` | `dict` | Peg metadata, present only for pegged currencies |
| `providers` | `list` | Provider keys that publish this currency |
| `start_date` | `str | None` | Earliest publication coverage date; use /coverage for queryable pairs |
| `symbol` | `str | None` | Currency symbol |

#### Example: Load

```python
currency = client.Currency().load({"id": "currency_id"})
```

#### Example: List

```python
currencys = client.Currency().list()
```


### Provider

Create an instance: `provider = client.Provider()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `str | None` | ISO 3166-1 alpha-2 country code |
| `currencies` | `list` | Recognised currency codes within their valid date ranges covered by this provider |
| `data_url` | `str | None` | Link to the data source |
| `end_date` | `str | None` | Latest publication coverage date; use /coverage for queryable pairs |
| `frequency` | `str` | The period each observation stands for, after SDMX FREQ. |
| `key` | `str` | Provider identifier |
| `name` | `str` | Full provider name |
| `pivot_currency` | `str | None` | Base currency for published rates |
| `publish_cadence` | `str | None` | How often the provider publishes rates. |
| `publishes_missed` | `int | None` | Number of expected publishes missed since end_date, in units of publish_cadence. |
| `rate_type` | `str | None` | Official rate type as used by the source |
| `start_date` | `str | None` | Earliest publication coverage date; use /coverage for queryable pairs |
| `terms_url` | `str | None` | Link to terms of use |
| `unknown_currencies` | `list` | Unreviewed published codes absent from the currency registry. |

#### Example: Load

```python
provider = client.Provider().load({"id": "provider_id"})
```

#### Example: List

```python
providers = client.Provider().list()
```


### Rate

Create an instance: `rate = client.Rate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base currency or accounting unit code |
| `date` | `str` | The date of the rate |
| `id` | `str` |  |
| `providers` | `list` | Per-provider rates for this pair. |
| `quote` | `str` | Quote currency or accounting unit code |
| `rate` | `float` | Exchange rate value |

#### Example: Load

```python
rate = client.Rate().load({"base": "base", "quote": "quote"})
```

#### Example: List

```python
rates = client.Rate().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── frankfurter_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`frankfurter_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
currency = client.Currency()
currency.list()

# currency.data_get() now returns the currency data from the last list
# currency.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
