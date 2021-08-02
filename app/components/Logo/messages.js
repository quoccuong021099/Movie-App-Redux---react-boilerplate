/*
 * Logo Messages
 *
 * This contains all the text for the Logo component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Logo';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Logo component!',
  },
});
