import React from "react";
import styles from './Home.module.scss';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllAds } from "../../store/adReducer";

import { imagesURL } from "../../configure";

const Home = () => {
	const ads = useSelector(state => getAllAds(state));

	return (
		<section>
			<h2>Ads</h2>
			<ul className={styles.adlist}>
				{ads ? ads.map((ad) => {
					return (
						<li key={ad._id}>
							<div>
								<Link to={`/ad/${ad._id}`} className={styles.adlink}>
									<h3>{ad.title}</h3>
									<img src={`${imagesURL}${ad.image}`} alt={`${ad.title}`}/>
									<p>{`${ad.price} PLN`}</p>
									<p>{`Localization: ${ad.localization}`}</p>
								</Link>
							</div>
						</li>
					)
				}) : 'No ads...'
				}
			</ul>
		</section>
	);
};

export default Home;