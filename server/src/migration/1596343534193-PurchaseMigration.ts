import {MigrationInterface, QueryRunner} from "typeorm";

export class PurchaseMigration1596343534193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "isPurchased" boolean NOT NULL DEFAULT 'True', "carId" uuid, "ownerId" uuid, CONSTRAINT "REL_ba4bc07f49639df7805adaedb4" UNIQUE ("carId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "wallet" ADD "ownerId" uuid`);
        // await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_9bf56f7989a7e5717c92221cce0" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ba4bc07f49639df7805adaedb42" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_36eff870cbb426cbaa8f79de886" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_36eff870cbb426cbaa8f79de886"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ba4bc07f49639df7805adaedb42"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
