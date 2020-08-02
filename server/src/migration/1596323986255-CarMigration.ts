import {MigrationInterface, QueryRunner} from "typeorm";

export class CarMigration1596323986255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "make" character varying NOT NULL, "model" character varying NOT NULL, "vin" character varying NOT NULL, "price" integer NOT NULL, "location" character varying NOT NULL, "features" character varying, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
