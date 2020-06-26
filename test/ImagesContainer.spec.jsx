import ImagesContainer from '../src/ImagesContainer';
import {shallow} from 'enzyme';

import eventpromoFixture from './fixtures/eventpromoFixture';

describe('Component: ImagesContainer', () => {
    describe('image slideshow button', () => {
        test('should be labelled play when it is paused', () => {
            const element = <ImagesContainer isPaused={true} {...eventpromoFixture} />;
            const button = shallow(element).render().find('button');
            expect(button.attr('aria-label')).toEqual('Play \"FT Brexit and Beyond Summit\" image slideshow');
        });
        test('should be labelled pause when it is playing', () => {
            const element = <ImagesContainer isPaused={false} {...eventpromoFixture} />;
            const button = shallow(element).render().find('button');
            expect(button.attr('aria-label')).toEqual('Pause \"FT Brexit and Beyond Summit\" image slideshow');
        });
    });
});
