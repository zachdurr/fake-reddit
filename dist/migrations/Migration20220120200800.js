"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220120200800 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220120200800 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" varchar(255) not null);');
    }
}
exports.Migration20220120200800 = Migration20220120200800;
//# sourceMappingURL=Migration20220120200800.js.map