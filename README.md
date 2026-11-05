# Frankfurter SDK

Unofficial TypeScript, JavaScript and Python SDKs for the [Frankfurter API](https://frankfurter.dev) v2, which serves current and historical exchange rates. The API needs no key and no account.

Generated from the published OpenAPI spec with the [Voxgig SDK Generator](https://voxgig.com/sdk). Not affiliated with or endorsed by Frankfurter or Voxgig.

## Install

The packages are not on npm or PyPI yet, so install from a clone.

```bash
git clone https://github.com/SanderSaxBuilds/frankfurter-sdk
npm install ./frankfurter-sdk/ts
```

For Python:

```bash
pip install ./frankfurter-sdk/py
```

## Quickstart

```ts
import { FrankfurterSDK } from 'frankfurter-sdk'

const client = new FrankfurterSDK()

const rate = await client.Rate().load({ base: 'EUR', quote: 'USD' })
console.log(rate.data())
```

This prints a record like the one below. The date and rate are whatever the API holds on the day.

```json
{ "date": "2026-11-05", "base": "EUR", "quote": "USD", "rate": 1.1242 }
```

The same call in Python:

```python
from frankfurter_sdk import FrankfurterSDK

client = FrankfurterSDK()

rate = client.Rate().load({"base": "EUR", "quote": "USD"})
print(rate.data_get())
```

## Entities

| Entity | Call | API route |
| --- | --- | --- |
| Rate | `load({ base, quote })` | `GET /rate/{base}/{quote}` |
| Rate | `load({ provider, base, quote })` | `GET /providers/{provider}/rate/{base}/{quote}` |
| Rate | `list({ base, quotes, date, from, to, providers, group, expand })` | `GET /rates` |
| Rate | `list({ provider, quotes })` | `GET /providers/{provider}/rates` |
| Currency | `list()` | `GET /currencies` |
| Currency | `load({ id: 'USD' })` | `GET /currency/{code}` |
| Provider | `list()` | `GET /providers` |
| Provider | `load({ id: 'ECB' })` | `GET /providers/{provider}` |
| Coverage | `load({ base, quotes, providers })` | `GET /coverage` |

`quotes` and `providers` are comma-separated strings, as in the API. Language reference pages are in [ts/README.md](ts/README.md), [js/README.md](js/README.md) and [py/README.md](py/README.md).

## Tests

| Target | Run | Result |
| --- | --- | --- |
| TypeScript | `cd ts && npm install && npm test` | Node 24: 241 passed, 0 failed, 12 skipped |
| JavaScript | `cd js && npm install && npm test` | 229 passed, 0 failed, 12 skipped |
| Python | `cd py && pip install . pytest && pytest test/` | 223 passed, 93 skipped |

Skipped tests are optional generator features this SDK does not use, plus one Python type check that needs mypy. Set `FRANKFURTER_TEST_LIVE=TRUE` to run the live tests against the real API.

## Known limits

- On Node 26, three TypeScript documentation tests fail with `ERR_INVALID_ARG_VALUE`, because the generated test calls `stripTypeScriptTypes` with `mode: 'transform'`. Use Node 24 for the TypeScript tests. The SDK itself works on Node 26.
- In TypeScript, `Rate().list({ provider: 'ECB' })` works at runtime, but the generated type does not include `provider`. Use `providers: 'ECB'` instead, which goes to `GET /rates`.
- API error detail is in `err.result.body.message`, not in `err.message`.

## Regenerating

The SDK source comes from the model in `.sdk/model`. Project settings are in `.sdk/model/project.aontu`, and corrections to how the spec is read are in `.sdk/model/guide/guide.aontu`.

```bash
cd .sdk
npm install
npm run generate
```

`npm run generate` overwrites this README with the generated one, so run `git checkout README.md` afterwards.

## License

MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Alexandr Khrustalev.
