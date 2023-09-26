import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

import Stack from 'react-bootstrap/Stack';

const NavBar = () => {
	return (
		<>
			<Stack direction='horizontal' gap={2}>
				<p className='p-2'>MarketPlace</p>
				<nav className='p-2 ms-auto'>
						<ul className={styles.navlist}>
						<Stack direction='horizontal' gap={3}>
							<li className={`${styles.navitem} p-2`}><NavLink to='/'>Home</NavLink></li>
							<li className={`${styles.navitem} p-2`}><NavLink to='/register'>Register</NavLink></li>
							<li className={`${styles.navitem} p-2`}><NavLink to='/login'>Login</NavLink></li>
							</Stack>
						</ul>
				</nav>
			</Stack>
		</>
	)
}

export default NavBar