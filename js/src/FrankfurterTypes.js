// Typed models for the Frankfurter SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Coverage
 * @property {string} base
 * @property {string|null} end_date
 * @property {Array|null} providers
 * @property {Array|null} quotes
 * @property {string|null} start_date
 */

/**
 * @typedef {Object} CoverageLoadMatch
 * @property {string} [base]
 * @property {string} [providers]
 * @property {string} [quotes]
 */

/**
 * @typedef {Object} Currency
 * @property {string|null} [end_date]
 * @property {string} iso_code
 * @property {string|null} [iso_numeric]
 * @property {string} name
 * @property {Object} [peg]
 * @property {Array} [providers]
 * @property {string|null} [start_date]
 * @property {string|null} [symbol]
 */

/**
 * @typedef {Object} CurrencyLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} CurrencyListMatch
 * @property {string} [providers]
 * @property {string} [scope]
 */

/**
 * @typedef {Object} Provider
 * @property {string|null} [country_code]
 * @property {Array} currencies
 * @property {string|null} [data_url]
 * @property {string|null} [end_date]
 * @property {string} [frequency]
 * @property {string} key
 * @property {string} name
 * @property {string|null} [pivot_currency]
 * @property {string|null} [publish_cadence]
 * @property {number|null} [publishes_missed]
 * @property {string|null} [rate_type]
 * @property {string|null} [start_date]
 * @property {string|null} [terms_url]
 * @property {Array} [unknown_currencies]
 */

/**
 * @typedef {Object} ProviderLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ProviderListMatch
 * @property {string|null} [country_code]
 * @property {Array} [currencies]
 * @property {string|null} [data_url]
 * @property {string|null} [end_date]
 * @property {string} [frequency]
 * @property {string} [key]
 * @property {string} [name]
 * @property {string|null} [pivot_currency]
 * @property {string|null} [publish_cadence]
 * @property {number|null} [publishes_missed]
 * @property {string|null} [rate_type]
 * @property {string|null} [start_date]
 * @property {string|null} [terms_url]
 * @property {Array} [unknown_currencies]
 */

/**
 * @typedef {Object} Rate
 * @property {string} base
 * @property {string} date
 * @property {string} [id]
 * @property {Array} [providers]
 * @property {string} quote
 * @property {number} rate
 */

/**
 * @typedef {Object} RateLoadMatch
 * @property {string} base
 * @property {string} [provider]
 * @property {string} quote
 * @property {string} [date]
 * @property {string} [providers]
 */

/**
 * @typedef {Object} RateListMatch
 * @property {string} [base]
 * @property {string} [date]
 * @property {string} [expand]
 * @property {string} [from]
 * @property {string} [group]
 * @property {string} [providers]
 * @property {string} [quotes]
 * @property {string} [to]
 */

