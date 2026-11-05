export interface Coverage {
    base: string;
    end_date: string | null;
    providers: any[] | null;
    quotes: any[] | null;
    start_date: string | null;
}
export interface CoverageLoadMatch {
    base?: string;
    providers?: string;
    quotes?: string;
}
export interface Currency {
    end_date?: string | null;
    iso_code: string;
    iso_numeric?: string | null;
    name: string;
    peg?: Record<string, any>;
    providers?: any[];
    start_date?: string | null;
    symbol?: string | null;
}
export interface CurrencyLoadMatch {
    id: string;
}
export interface CurrencyListMatch {
    providers?: string;
    scope?: string;
}
export interface Provider {
    country_code?: string | null;
    currencies: any[];
    data_url?: string | null;
    end_date?: string | null;
    frequency?: string;
    key: string;
    name: string;
    pivot_currency?: string | null;
    publish_cadence?: string | null;
    publishes_missed?: number | null;
    rate_type?: string | null;
    start_date?: string | null;
    terms_url?: string | null;
    unknown_currencies?: any[];
}
export interface ProviderLoadMatch {
    id: string;
}
export interface ProviderListMatch {
    country_code?: string | null;
    currencies?: any[];
    data_url?: string | null;
    end_date?: string | null;
    frequency?: string;
    key?: string;
    name?: string;
    pivot_currency?: string | null;
    publish_cadence?: string | null;
    publishes_missed?: number | null;
    rate_type?: string | null;
    start_date?: string | null;
    terms_url?: string | null;
    unknown_currencies?: any[];
}
export interface Rate {
    base: string;
    date: string;
    id?: string;
    providers?: any[];
    quote: string;
    rate: number;
}
export interface RateLoadMatch {
    base: string;
    provider?: string;
    quote: string;
    date?: string;
    providers?: string;
}
export interface RateListMatch {
    base?: string;
    date?: string;
    expand?: string;
    from?: string;
    group?: string;
    providers?: string;
    quotes?: string;
    to?: string;
}
