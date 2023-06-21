create type "public"."PostType" as enum ('FOOD', 'RESOURCE');

create type "public"."Role" as enum ('DONOR', 'ORG');

create table "public"."Account" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid not null,
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text
);


create table "public"."List" (
    "id" uuid not null default gen_random_uuid(),
    "postsId" uuid,
    "name" text not null,
    "quantity" text not null
);


create table "public"."Posts" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid,
    "type" "PostType" not null default 'FOOD'::"PostType",
    "createdAt" timestamp with time zone not null default now()
);


create table "public"."Session" (
    "id" uuid not null default gen_random_uuid(),
    "sessionToken" text not null,
    "userId" uuid not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."User" (
    "id" uuid not null default gen_random_uuid(),
    "role" "Role" not null default 'DONOR'::"Role",
    "name" text,
    "username" text,
    "password" text,
    "bio" text,
    "address" text,
    "email" text,
    "emailVerified" timestamp(3) without time zone,
    "image" text,
    "phone" text
);


create table "public"."VerificationToken" (
    "identifier" text not null,
    "token" text not null,
    "expires" timestamp(3) without time zone not null
);


CREATE UNIQUE INDEX "Account_pkey" ON public."Account" USING btree (id);

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX "List_pkey" ON public."List" USING btree (id);

CREATE UNIQUE INDEX "Posts_pkey" ON public."Posts" USING btree (id);

CREATE UNIQUE INDEX "Session_pkey" ON public."Session" USING btree (id);

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE INDEX "User_id_idx" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);

alter table "public"."Account" add constraint "Account_pkey" PRIMARY KEY using index "Account_pkey";

alter table "public"."List" add constraint "List_pkey" PRIMARY KEY using index "List_pkey";

alter table "public"."Posts" add constraint "Posts_pkey" PRIMARY KEY using index "Posts_pkey";

alter table "public"."Session" add constraint "Session_pkey" PRIMARY KEY using index "Session_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."Account" add constraint "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_userId_fkey";

alter table "public"."List" add constraint "List_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."List" validate constraint "List_postsId_fkey";

alter table "public"."Posts" add constraint "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Posts" validate constraint "Posts_userId_fkey";

alter table "public"."Session" add constraint "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Session" validate constraint "Session_userId_fkey";


