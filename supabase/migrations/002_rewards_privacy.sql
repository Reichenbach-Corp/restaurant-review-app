create table public.points_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete restrict,
    points integer not null,
    transaction_type text not null,
    reference_type text,
    reference_id uuid,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);
create index points_user_created_idx on public.points_transactions(user_id, created_at desc);

create table public.rewards (
    id uuid primary key default gen_random_uuid(),
    sponsor text,
    title text not null,
    description text,
    points_required integer not null check (points_required > 0),
    quantity_available integer,
    redemption_type text not null,
    valid_from timestamptz,
    valid_until timestamptz,
    active boolean not null default true,
    created_at timestamptz not null default now()
);

create table public.reward_redemptions (
    id uuid primary key default gen_random_uuid(),
    reward_id uuid not null references public.rewards(id) on delete restrict,
    user_id uuid not null references public.profiles(id) on delete restrict,
    points_spent integer not null,
    redemption_code text,
    status text not null default 'issued',
    created_at timestamptz not null default now()
);

create table public.verification_events (
    id uuid primary key default gen_random_uuid(),
    review_id uuid not null references public.reviews(id) on delete cascade,
    verification_type text not null,
    result boolean not null,
    distance_metres numeric(8,2),
    verified_at timestamptz not null default now(),
    evidence_deleted_at timestamptz
);

create table public.moderation_events (
    id uuid primary key default gen_random_uuid(),
    review_id uuid not null references public.reviews(id) on delete cascade,
    event_type text not null,
    reason text,
    actor_type text not null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create table public.user_reports (
    id uuid primary key default gen_random_uuid(),
    review_id uuid not null references public.reviews(id) on delete cascade,
    reporting_user_id uuid references public.profiles(id) on delete set null,
    reason text not null,
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.points_transactions enable row level security;
alter table public.reward_redemptions enable row level security;
alter table public.verification_events enable row level security;

create policy "user reads own profile" on public.profiles for select using (auth.uid() = id);
create policy "user updates own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "user reads own points" on public.points_transactions for select using (auth.uid() = user_id);
create policy "user reads own redemptions" on public.reward_redemptions for select using (auth.uid() = user_id);

create view public.public_profiles as
select id, pseudonym, avatar_key, review_count
from public.profiles
where account_status = 'active';
