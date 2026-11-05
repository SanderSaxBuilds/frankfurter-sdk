# Frankfurter Python SDK Reference

Complete API reference for the Frankfurter Python SDK.


## FrankfurterSDK

### Constructor

```python
from frankfurter_sdk import FrankfurterSDK

client = FrankfurterSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FrankfurterSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FrankfurterSDK.test()
```


### Instance Methods

#### `Coverage(data=None)`

Create a new `CoverageEntity` instance. Pass `None` for no initial data.

#### `Currency(data=None)`

Create a new `CurrencyEntity` instance. Pass `None` for no initial data.

#### `Provider(data=None)`

Create a new `ProviderEntity` instance. Pass `None` for no initial data.

#### `Rate(data=None)`

Create a new `RateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CoverageEntity

```python
coverage = client.Coverage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes | Requested base currency, EUR by default |
| `end_date` | `str | None` | Yes | Last eligible observation date with a nonempty matching rates query |
| `providers` | `list | None` | Yes | Selected providers, or null for the default daily blend |
| `quotes` | `list | None` | Yes | Requested quotes, or null for all |
| `start_date` | `str | None` | Yes | First eligible observation date with a nonempty matching rates query |

### Operations

#### `load(reqmatch, ctrl=None) -> CoverageEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Coverage().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoverageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyEntity

```python
currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end_date` | `str | None` | No | Latest publication coverage date; use /coverage for queryable pairs |
| `iso_code` | `str` | Yes | Currency or accounting unit code |
| `iso_numeric` | `str | None` | No | ISO 4217 numeric code |
| `name` | `str` | Yes | Full currency name |
| `peg` | `dict` | No | Peg metadata, present only for pegged currencies |
| `providers` | `list` | No | Provider keys that publish this currency |
| `start_date` | `str | None` | No | Earliest publication coverage date; use /coverage for queryable pairs |
| `symbol` | `str | None` | No | Currency symbol |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CurrencyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Currency().list()
for currency in results:
    print(currency.data_get())
```

#### `load(reqmatch, ctrl=None) -> CurrencyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Currency().load({"id": "currency_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProviderEntity

```python
provider = client.Provider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `str | None` | No | ISO 3166-1 alpha-2 country code |
| `currencies` | `list` | Yes | Recognised currency codes within their valid date ranges covered by this provider |
| `data_url` | `str | None` | No | Link to the data source |
| `end_date` | `str | None` | No | Latest publication coverage date; use /coverage for queryable pairs |
| `frequency` | `str` | No | The period each observation stands for, after SDMX FREQ. |
| `key` | `str` | Yes | Provider identifier |
| `name` | `str` | Yes | Full provider name |
| `pivot_currency` | `str | None` | No | Base currency for published rates |
| `publish_cadence` | `str | None` | No | How often the provider publishes rates. |
| `publishes_missed` | `int | None` | No | Number of expected publishes missed since end_date, in units of publish_cadence. |
| `rate_type` | `str | None` | No | Official rate type as used by the source |
| `start_date` | `str | None` | No | Earliest publication coverage date; use /coverage for queryable pairs |
| `terms_url` | `str | None` | No | Link to terms of use |
| `unknown_currencies` | `list` | No | Unreviewed published codes absent from the currency registry. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProviderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Provider().list()
for provider in results:
    print(provider.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProviderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Provider().load({"id": "provider_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProviderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RateEntity

```python
rate = client.Rate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `str` | Yes | Base currency or accounting unit code |
| `date` | `str` | Yes | The date of the rate |
| `id` | `str` | No |  |
| `providers` | `list` | No | Per-provider rates for this pair. |
| `quote` | `str` | Yes | Quote currency or accounting unit code |
| `rate` | `float` | Yes | Exchange rate value |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Rate().list()
for rate in results:
    print(rate.data_get())
```

#### `load(reqmatch, ctrl=None) -> RateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Rate().load({"base": "base", "quote": "quote"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = FrankfurterSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

