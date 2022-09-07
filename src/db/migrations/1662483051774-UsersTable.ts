import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1662483051774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            username varchar(100) NOT NULL,
            dob date DEFAULT NULL,
            name varchar(200) DEFAULT NULL,
            occupation varchar(200) DEFAULT NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY users_username_uq (username),
            KEY users_name_idx (name),
            KEY users_dob_idx (dob),
            KEY users_occupation_idx (occupation)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE users;
    `);
  }
}
