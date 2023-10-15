CREATE TABLE "roles" (
  "role_id" SERIAL PRIMARY KEY,
  "role" VARCHAR(255)
);

CREATE TABLE "permissions" (
  "permission_id" SERIAL PRIMARY KEY,
  "permission" VARCHAR(255)
);

CREATE TABLE "role_permission" (
  "id" SERIAL PRIMARY KEY,
  "role_id" integer,
  "permission_id" integer
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "birthdate" date,
  "city" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "phoneNumbur" integer,
  "role_id" INT,
  "is_deleted" SMALLINT
);

CREATE TABLE "providers" (
  "provider_id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "age" INT,
  "city" VARCHAR(255),
  "phoneNumbur" integer,
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "role_id" INT,
  "category_id" integer,
  "appointment_id" integer,
  "is_deleted" SMALLINT
);

CREATE TABLE "categories" (
  "category_id" SERIAL PRIMARY KEY,
  "category" VARCHAR(255)
);

CREATE TABLE "comments" (
  "comment_id" SERIAL PRIMARY KEY,
  "comment" TEXT,
  "provider_id" INT,
  "commenter_id" INT,
  "is_deleted" SMALLINT
);

CREATE TABLE "schedule" (
  "schedule_id" SERIAL PRIMARY KEY,
  "date" DATETIME,
  "book" DEFAULT(false)
);

CREATE TABLE "services" (
  "service_id" SERIAL PRIMARY KEY,
  "service" VARCHAR,
  "price" integer
);

CREATE TABLE "orders" (
  "order_id" SERIAL PRIMARY KEY,
  "service_id" integer,
  "user_id" integer,
  "provider_id" integer,
  "created_at" timestamb,
  "schedule_id" integer
);

CREATE TABLE "provider_notes" (
  "provider_note_id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "provider_id" integer,
  "time" timestamb,
  "note" VARCHAR
);

CREATE TABLE "history" (
  "history_id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "history" VARCHAR,
  "medication" VARCHAR,
  "chronic_diseases" VARCHAR
);

CREATE TABLE "provider_info" (
  "provider_id" SERIAL PRIMARY KEY,
  "img" VARCHAR(1000),
  "bio" MEDIUMTEXT,
  "qualifications" MEDIUMTEXT,
  "service_id" INT,
  "is_deleted" DEFAULT
);

ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "permissions" ("permission_id");

ALTER TABLE "users" ADD FOREIGN KEY ("user_id") REFERENCES "roles" ("role_id");

ALTER TABLE "providers" ADD FOREIGN KEY ("provider_id") REFERENCES "categories" ("category_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("comment_id") REFERENCES "providers" ("provider_id");

ALTER TABLE "schedule" ADD FOREIGN KEY ("schedule_id") REFERENCES "providers" ("provider_id");

CREATE TABLE "providers_orders" (
  "providers_provider_id" SERIAL,
  "orders_provider_id" integer,
  PRIMARY KEY ("providers_provider_id", "orders_provider_id")
);

ALTER TABLE "providers_orders" ADD FOREIGN KEY ("providers_provider_id") REFERENCES "providers" ("provider_id");

ALTER TABLE "providers_orders" ADD FOREIGN KEY ("orders_provider_id") REFERENCES "orders" ("provider_id");


CREATE TABLE "users_orders" (
  "users_user_id" SERIAL,
  "orders_user_id" integer,
  PRIMARY KEY ("users_user_id", "orders_user_id")
);

ALTER TABLE "users_orders" ADD FOREIGN KEY ("users_user_id") REFERENCES "users" ("user_id");

ALTER TABLE "users_orders" ADD FOREIGN KEY ("orders_user_id") REFERENCES "orders" ("user_id");


CREATE TABLE "services_orders" (
  "services_service_id" SERIAL,
  "orders_service_id" integer,
  PRIMARY KEY ("services_service_id", "orders_service_id")
);

ALTER TABLE "services_orders" ADD FOREIGN KEY ("services_service_id") REFERENCES "services" ("service_id");

ALTER TABLE "services_orders" ADD FOREIGN KEY ("orders_service_id") REFERENCES "orders" ("service_id");


CREATE TABLE "providers_provider_notes" (
  "providers_provider_id" SERIAL,
  "provider_notes_provider_id" integer,
  PRIMARY KEY ("providers_provider_id", "provider_notes_provider_id")
);

ALTER TABLE "providers_provider_notes" ADD FOREIGN KEY ("providers_provider_id") REFERENCES "providers" ("provider_id");

ALTER TABLE "providers_provider_notes" ADD FOREIGN KEY ("provider_notes_provider_id") REFERENCES "provider_notes" ("provider_id");


ALTER TABLE "provider_notes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "users" ADD FOREIGN KEY ("user_id") REFERENCES "history" ("user_id");

ALTER TABLE "provider_info" ADD FOREIGN KEY ("provider_id") REFERENCES "providers" ("provider_id");

ALTER TABLE "services" ADD FOREIGN KEY ("service_id") REFERENCES "provider_info" ("service_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("schedule_id") REFERENCES "schedule" ("schedule_id");
