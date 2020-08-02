import {MigrationInterface, QueryRunner} from "typeorm";

export class WalletMigrationUpdate1596338775370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_9bf56f7989a7e5717c92221cce0" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_9bf56f7989a7e5717c92221cce0"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_9bf56f7989a7e5717c92221cce0"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "ownerId"`);
    }

}
