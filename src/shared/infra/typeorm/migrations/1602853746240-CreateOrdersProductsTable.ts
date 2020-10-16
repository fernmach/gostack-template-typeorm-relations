import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersProductsTable1602853746240
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'quantity',
            type: 'integer',
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
            name: 'OrderProductsCustomer',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'SET NULL', // RESTRICT, SET NULL, CASCADE
            onUpdate: 'CASCADE',
          },
          {
            name: 'OrderProductsProduct',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL', // RESTRICT, SET NULL, CASCADE
            onUpdate: 'CASCADE',
          },
          {
            name: 'OrderProductsOrder',
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'SET NULL', // RESTRICT, SET NULL, CASCADE
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('orders_products', 'OrderProductsOrder');
    await queryRunner.dropForeignKey('orders_products', 'OrderProductsProduct');
    await queryRunner.dropForeignKey(
      'orders_products',
      'OrderProductsCustomer',
    );

    await queryRunner.dropTable('orders_products');
  }
}
