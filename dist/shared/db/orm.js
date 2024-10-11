import { MikroORM } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'consultorio',
    type: 'mysql',
    clientUrl: 'mysql://nibble:nibble@localhost:3306/consultorio',
    highlighter: new MongoHighlighter(),
    debug: true,
    schemaGenerator: {
        //never in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map