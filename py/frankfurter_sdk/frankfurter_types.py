# Typed models for the Frankfurter SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Coverage(TypedDict):
    base: str
    end_date: str | None
    providers: list | None
    quotes: list | None
    start_date: str | None


class CoverageLoadMatch(TypedDict, total=False):
    base: str
    providers: str
    quotes: str


class CurrencyRequired(TypedDict):
    iso_code: str
    name: str


class Currency(CurrencyRequired, total=False):
    end_date: str | None
    iso_numeric: str | None
    peg: dict
    providers: list
    start_date: str | None
    symbol: str | None


class CurrencyLoadMatch(TypedDict):
    id: str


class CurrencyListMatch(TypedDict, total=False):
    providers: str
    scope: str


class ProviderRequired(TypedDict):
    currencies: list
    key: str
    name: str


class Provider(ProviderRequired, total=False):
    country_code: str | None
    data_url: str | None
    end_date: str | None
    frequency: str
    pivot_currency: str | None
    publish_cadence: str | None
    publishes_missed: int | None
    rate_type: str | None
    start_date: str | None
    terms_url: str | None
    unknown_currencies: list


class ProviderLoadMatch(TypedDict):
    id: str


class ProviderListMatch(TypedDict, total=False):
    country_code: str | None
    currencies: list
    data_url: str | None
    end_date: str | None
    frequency: str
    key: str
    name: str
    pivot_currency: str | None
    publish_cadence: str | None
    publishes_missed: int | None
    rate_type: str | None
    start_date: str | None
    terms_url: str | None
    unknown_currencies: list


class RateRequired(TypedDict):
    base: str
    date: str
    quote: str
    rate: float


class Rate(RateRequired, total=False):
    id: str
    providers: list


class RateLoadMatchRequired(TypedDict):
    base: str
    quote: str


class RateLoadMatch(RateLoadMatchRequired, total=False):
    provider: str
    date: str
    providers: str


RateListMatch = TypedDict('RateListMatch', {
    "base": str,
    "date": str,
    "expand": str,
    "from": str,
    "group": str,
    "providers": str,
    "quotes": str,
    "to": str,
}, total=False)
