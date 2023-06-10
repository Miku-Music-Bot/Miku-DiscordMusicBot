import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import sinon from 'sinon';
import path from 'path';
import fs from 'fs-extra';

import arraysMatchUnordered from '../test_utils/arrays_match_unordered.test';
import { stubLogger, createLoggerStub } from '../test_utils/stub_logger.test';
import { createDirectory, removeDirectory } from '../test_utils/test_directory.test';
import uniqueID from '../test_utils/unique_id.test';

import { SQLiteInterfaceTester } from './sqlite_interface_test_utils.test';
import sqlite3 from 'sqlite3';

const SQLITE_DB_DIRECTORY = path.join(__dirname, 'test_sqlite_interface');

describe('SQLite Interface', () => {
  before(() => {
    createDirectory(SQLITE_DB_DIRECTORY);
  });

  beforeEach(() => {
    stubLogger();
  });

  after(() => {
    removeDirectory(SQLITE_DB_DIRECTORY);
  });

  it('opens existing database', async () => {
    const tables = [
      {
        name: 'test_table',
        cols: '(col1 STRING, col2 INT)',
      },
    ];
    const db_location = path.join(__dirname, '..', '..', 'src', 'sqlite_interface', 'sqlite_interface.test.db');
    const sqlite_interface = new SQLiteInterfaceTester(db_location, tables, createLoggerStub());

    const rows = await sqlite_interface.dbAll('SELECT * FROM test_table', {});

    const expected_rows = [
      { col1: 'some string', col2: 0 },
      { col1: 'another string', col2: 1 },
      { col1: 'a string', col2: 2 },
    ];
    assert(
      arraysMatchUnordered(expected_rows, rows, (a, b) => a.col1 === b.col1 && a.col2 === b.col2),
      'Reads existing database correctly'
    );

    await sqlite_interface.close();
  });

  it('creates new database if no database exists and writes to it', async () => {
    const tables = [
      {
        name: 'test_table0',
        cols: '(col1 STRING, col2 INT)',
      },
      {
        name: 'test_table1',
        cols: '(col3 STRING, col4 INT)',
      },
    ];
    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, tables, createLoggerStub());

    await sqlite_interface.dbRun('INSERT INTO test_table0 VALUES ($col1, $col2)', {
      $col1: 'some string',
      $col2: '0',
    });

    const rows = await sqlite_interface.dbAll('SELECT * FROM test_table0', {});

    const expected_rows = [{ col1: 'some string', col2: 0 }];
    assert(
      arraysMatchUnordered(expected_rows, rows, (a, b) => a.col1 === b.col1 && a.col2 === b.col2),
      'Writes to new database correctly'
    );

    assert(fs.existsSync(db_location), 'Creates database at correct location');

    await sqlite_interface.close();
  });

  it('rejects ready if it fails to open database', async () => {
    sinon.stub(sqlite3, 'Database').yields(new Error('Failed to Open Database'));

    const db_location = path.join(__dirname, '..', '..', 'src', 'sqlite_interface', 'sqlite_interface.test.db');
    const sqlite_interface = new SQLiteInterfaceTester(db_location, [], createLoggerStub());

    await assert.isRejected(sqlite_interface.ready, 'Failed to Open Database');
  });

  it('rejects ready if it fails to create tables', async () => {
    sinon.stub(sqlite3, 'Database').callsFake((db_path, cb) => {
      setImmediate(() => {
        cb();
      });
      return {
        run: sinon.fake.yields(new Error('Failed to Run Command')),
      };
    });

    const tables = [
      {
        name: 'test_table0',
        cols: '(col1 STRING, col2 INT)',
      },
      {
        name: 'test_table1',
        cols: '(col3 STRING, col4 INT)',
      },
    ];
    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, tables, createLoggerStub());

    await assert.isRejected(sqlite_interface.ready, 'Failed to Run Command');
  });

  it('rejected ready if error occurs while checking database exists already or not', async () => {
    sinon.stub(fs, 'existsSync').callsFake(sinon.fake.throws('Failed to Check Exists'));

    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, [], createLoggerStub());

    await assert.isRejected(sqlite_interface.ready, 'Failed to Check Exists');
  });

  it('rejects dbRun if sqlite3 returns error', async () => {
    sinon.stub(sqlite3, 'Database').callsFake((db_path, cb) => {
      setImmediate(() => {
        cb();
      });
      return {
        serialize: sinon.fake.yields(),
        run: sinon.fake.yields(new Error('Failed to Run Command')),
      };
    });
    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, [], createLoggerStub());

    await assert.isRejected(
      sqlite_interface.dbRun('CREATE TABLE test_table (col1 STRING, col2 INT)', {}),
      'Failed to Run Command'
    );
  });

  it('rejects dbAll if sqlite3 returns error', async () => {
    sinon.stub(sqlite3, 'Database').callsFake((db_path, cb) => {
      setImmediate(() => {
        cb();
      });
      return {
        serialize: sinon.fake.yields(),
        all: sinon.fake.yields(new Error('Failed to Fetch All')),
      };
    });
    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, [], createLoggerStub());

    await assert.isRejected(
      sqlite_interface.dbAll('SELECT count(*) FROM sqlite_master WHERE type = "table"', {}),
      'Failed to Fetch All'
    );
  });

  it('rejects close if sqlite3 returns error', async () => {
    sinon.stub(sqlite3, 'Database').callsFake((db_path, cb) => {
      setImmediate(() => {
        cb();
      });
      return {
        close: sinon.fake.yields(new Error('Failed to Close')),
      };
    });
    const db_location = path.join(SQLITE_DB_DIRECTORY, uniqueID());
    const sqlite_interface = new SQLiteInterfaceTester(db_location, [], createLoggerStub());

    await assert.isRejected(sqlite_interface.close(), 'Failed to Close');
  });
});
