create extension if not exists "pgcrypto";

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    pseudonym text not null unique,
    avatar_key text,
    account_status text not null default 'active',
    review_count integer not null default 0,
    verified_review_count integer not null default 0,
    points_balance_cache integer not null default 0,
    trust_score_internal numeric(5,2) not null default 50.00,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    last_active_at timestamptz
);

create table public.restaurants (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    parent_company text,
    website text,
    logo_url text,
    restaurant_type text not null default 'QSR',
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.restaurant_locations (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid not null references public.restaurants(id) on delete cascade,
    external_place_id text,
    name_override text,
    address_line text not null,
    city text not null,
    province text not null,
    postal_code text,
    country text not null default 'Canada',
    latitude numeric(9,6) not null,
    longitude numeric(9,6) not null,
    timezone text not null default 'America/Toronto',
    ownership_type text,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index restaurant_locations_lat_lng_idx on public.restaurant_locations(latitude, longitude);

create table public.menu_items (
    id uuid primary key default gen_random_uuid(),
    restaurant_id uuid not null references public.restaurants(id) on delete cascade,
    name text not null,
    category text,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    unique (restaurant_id, name)
);

create table public.reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete restrict,
    location_id uuid not null references public.restaurant_locations(id) on delete restrict,
    created_at timestamptz not null default now(),
    visit_at timestamptz not null,
    food_score smallint not null check (food_score between 1 and 5),
    speed_score smallint not null check (speed_score between 1 and 5),
    service_score smallint not null check (service_score between 1 and 5),
    calculated_score numeric(3,2) generated always as (((food_score + speed_score + service_score)::numeric) / 3) stored,
    visit_type text check (visit_type in ('drive_through','dine_in','takeout','delivery')),
    verification_level smallint not null default 0 check (verification_level between 0 and 2),
    review_line_1 varchar(80),
    review_line_2 varchar(80),
    review_line_3 varchar(80),
    is_haiku boolean not null default false,
    moderation_status text not null default 'pending' check (moderation_status in ('pending','approved','flagged','hidden','removed')),
    status text not null default 'active',
    idempotency_key uuid not null unique
);

create index reviews_location_created_idx on public.reviews(location_id, created_at desc);
create index reviews_user_created_idx on public.reviews(user_id, created_at desc);

create table public.review_menu_items (
    review_id uuid not null references public.reviews(id) on delete cascade,
    menu_item_id uuid not null references public.menu_items(id) on delete restrict,
    item_score smallint check (item_score between 1 and 5),
    primary key (review_id, menu_item_id)
);

create table public.tags (
    id uuid primary key default gen_random_uuid(),
    tag_code text not null unique,
    display_name text not null,
    category text not null,
    sentiment text check (sentiment in ('positive','neutral','negative')),
    active boolean not null default true
);

create table public.review_tags (
    review_id uuid not null references public.reviews(id) on delete cascade,
    tag_id uuid not null references public.tags(id) on delete restrict,
    primary key (review_id, tag_id)
);
