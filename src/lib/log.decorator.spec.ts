// tslint:disable:no-expression-statement
import { test } from 'ava';
import { Log, setNamespace } from './log.decorator';

setNamespace('myNamespace');

class TestClass {

    @Log()
    public $l;

    constructor() {
        this.$l('constructing', this);
    }
}

let instance: TestClass;

test.beforeEach(() => {
    instance = new TestClass();
});

test('log decorator', t => {

    instance.$l('testing log', t);

    t.is(typeof instance.$l, 'function');
});
