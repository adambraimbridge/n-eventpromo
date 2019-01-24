import {Eventpromo} from '../src/Eventpromo';
import {shallow} from 'enzyme';

import eventpromoFixture from './fixtures/eventpromoFixture';

describe('Component: Eventpromo', () => {
    test('it should set the eventpromo id', () => {
        const promoElement = <Eventpromo isPaused={true} {...eventpromoFixture} />;
        expect(shallow(promoElement).prop('data-focus-concept')).toEqual(eventpromoFixture.id)
    });
});
