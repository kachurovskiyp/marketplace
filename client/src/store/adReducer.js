import { serverURI } from "../configure";

const createActionName = (actionName) => `app/ad/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');

const loadAds = payload => ({ type: LOAD_ADS, payload });
const addAd = payload => ({ type: ADD_AD, payload });
const editAd = payload => ({ type: EDIT_AD, payload });
const deleteAd = payload => ({ type: DELETE_AD, payload});

export const getAllAds = state => state.ad;
export const getAdById = (state, id) => {
	return state.ad.find((ad) => ad._id === id);
};

export const loadAdsRequest = () => {
	return (dispatch) => {
		fetch(`${serverURI}api/ads`)
			.then(res => res.json())
			.then(data => {
				dispatch(loadAds(data));
			});
	}
};
export const addAdRequest = (setStatus, newAd) => {
	return (dispatch) => {
		const options = {
			method: 'POST',
			body: newAd
		}

		fetch(`${serverURI}api/ads`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('success');
				} else {
					setStatus('serverError');
					return;
				}
				return res.json();
			})
			.then(data => {
				dispatch(addAd(data));
			});
	};
}
export const editAdRequest = (id, setStatus, newAd) => {
	return (dispatch) => {
		const options = {
			method: 'PUT',
			body: newAd
		};

		fetch(`${serverURI}api/ads/${id}`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('success');
				} else {
					setStatus('serverError');
					return;
				}
				return res.json();
			})
			.then(data => {
				dispatch(editAd(data));
			});
	}
};
export const deleteAdRequest = (id) => {
	
	return (dispatch) => {
		console.log('delete');
		
		const options = {
			method: 'DELETE'
		};

		fetch(`${serverURI}api/ads/${id}`, options)
			.then(res => {
				if(res.status === 200) {
					dispatch(deleteAd(id));
					return;
				}
			})
	}
};

const adReducer = (statePart = null, action) => {
	switch (action.type) {
		case LOAD_ADS:
			return action.payload;
		case ADD_AD:
			return [...statePart, action.payload];
		case EDIT_AD: {
			const newStatePart = statePart.filter(ad => ad._id !== action.payload._id);
			return [...newStatePart, action.payload];
		}
		case DELETE_AD: 
			return statePart.filter(ad => ad._id !== action.payload);
		default:
			return statePart;
	}
};

export default adReducer;