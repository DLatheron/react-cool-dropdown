import React from 'react';
import Dropdown from './Dropdown';
import renderer from 'react-test-renderer';

describe('Dropdown', () => {
    it('renders properly', () => {
        const tree = renderer
            .create(<Dropdown label='Email' placeholder='name@example.com' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
