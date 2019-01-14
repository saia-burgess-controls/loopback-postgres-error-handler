const path = require('path');

module.exports = async function(app) {
    const migration = app.get('migration');

    const {
        MigrationQueue,
        MigrationTask,
        tasks,
    } = migration;
    const { ExecuteSQLStatementTask } = tasks;
    const { CreateMigrationTable } = tasks.postgres;

    const plainTasks = [
        new CreateMigrationTable(),
        new ExecuteSQLStatementTask({
            identifier: 'Postgres:CreateAuthorTable',
            filePath: path.resolve(__dirname, '../models/author.sql'),
        }),
        new ExecuteSQLStatementTask({
            identifier: 'Postgres:CreateBookTable',
            filePath: path.resolve(__dirname, '../models/book.sql'),
        }),
    ];
    const migrationTasks = plainTasks.map(task => new MigrationTask(task));
    const queue = new MigrationQueue(migrationTasks, {
        transactionConfig: {},
    });
    return queue.run({ app });
};
