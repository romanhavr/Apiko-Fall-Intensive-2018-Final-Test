import * as Api from '../../api/api';
import * as actions from './appActions';

export function init() {
    return async dispatch => {
        try {
            Api.initApi();

            const user = await Api.User.getCurrent();

            dispatch(actions.fetchUserOk({
                user: user.data.user
            }));
        } catch {
            Api.removeToken();
        }
    }
}