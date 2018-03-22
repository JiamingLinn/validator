import createValidator, { b, a, group, any } from '../../src/lib/validator';

const bindMessage = b(() => true);
const fooV = b(() => false);


const v = createValidator({
    field1: bindMessage('field1 error'),
    field2: a([bindMessage('field2 error')]),
    field3: a([fooV('field3 should not be printed'), bindMessage('field3 error')]),
    field4: group({
        field41: bindMessage('field41 error'),
        field42: fooV('field42 should not be printed')
    }),
    field5: any([fooV('field5 should not be printed'), group({
        field51: bindMessage('field51 error'),
        field52: fooV('field52 should not be printed')
    })]),

    field6: any([
        bindMessage('field6 error'),
        group({
            field51: bindMessage('field61 should not be printed'),
            field52: fooV('field62 should not be printed')
        })
    ]),
});

console.log(v({}));
