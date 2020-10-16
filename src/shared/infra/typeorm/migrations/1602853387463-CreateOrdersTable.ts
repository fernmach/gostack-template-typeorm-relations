import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersTable1602853387463
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CustomerOrder',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'RESTRICT', // RESTRICT, SET NULL, CASCADE
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('orders', 'CustomerOrder');

    await queryRunner.dropTable('orders');
  }
}
