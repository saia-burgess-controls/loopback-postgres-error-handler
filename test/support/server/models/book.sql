CREATE TABLE "public"."Book"
(
  id                   SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author_id          INTEGER
    CONSTRAINT boot_author_id_fk
    REFERENCES "public"."Author"
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
