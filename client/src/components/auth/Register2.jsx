import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

const Register = () => {
	const [ user, setUser ] = useState({
		name: '',
		dayBirth: '',
		monthBirth: '',
		yearBirth: '',
		sex: ''
	});

	const [ sexType, setSexType ] = useState(false);

	const {
		name,
		dayBirth,
		monthBirth,
		yearBirth,
		sex
	} = user;


	const onInputChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmitDemo = async (e) => {
		e.preventDefault();
		console.log('Данные из формы:', name, dayBirth, monthBirth, yearBirth, sex);
	}

	const ontry = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		};
		const q = 'Ivan';
		const em = 'prsarosr@gmail.com';
		const pass = '123123123';
		try {
			const res = await axios.post('/api/auth', { name: q, email: em, password: pass }, config);
			console.log('Пользователь создан', res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Fragment>
			<div className="mudal visually-hidden popup-registration">
				<div className="mudal-container">
					<div className="mudal-content">
						<div className="registration-modal" id="registration-modal">
							<div className="mudal-dialog green">
								<header className="progress-slogan">
									<h1>Регистрация</h1>
									<button className="registration-close" name="close" />
								</header>
								{/* <!-- Закладка стиили! --> */}
								<div className="register-form">
									<div className="reg-inner">
										<form name="form" onSubmit={onSubmitDemo}>
											{/* <!--первая часть регистрации --> */}
											{/* <!-- вторая часть регистрации  --> */}
											<section className="regsect regsect-second">
												{/* <!-- Поле имени --> */}
												<div className="form-group ">
													<label htmlFor="form_user_firstname" className="required">
														<span>Имя</span>
													</label>
													<input
														className="form-text"
														type="text"
														id="form_user_firstname"
														name="name"
														minLength="1"
														maxLength="50"
														value={name}
														// required
														onChange={onInputChange}
													/>
													<span className="validator-icon form-control-feedback" />
												</div>
												
												{/* <!-- Поле выбора даты рождения --> */}
												<div className="form-group mobile-wide">
													<label className="required">Дата рождения</label>
													<div className="select-wrap dob">
														<div id="form_user_dob" data-error="Please check your details">
															{/* <!-- селект дней --> */}
															<span className="select-container">
																<select
																	className="form-control valid"
																	id="form_user_dob_day"
																	name="dayBirth"
																	value={dayBirth}
																	onChange={onInputChange}
																>
																	{/* <!-- Опции выбора дня рождения --> */}
																	<option value="grapefruit">Грейпфрут</option>
																	<option value="lime">Лайм</option>
																	<option value="coconut">Кокос</option>
																	<option value="mango">Манго</option>
																</select>
																<span className="arrow-down" htmlFor="form_user_dob_day" />
															</span>
															{/* <!-- селект месяцей --> */}
															<span className="select-container">
																<select
																	className="form-control valid"
																	id="form_user_dob_month"
																	name="monthBirth"
																	value={monthBirth}
																	onChange={onInputChange}
																>
																	{/* <!-- Опции выбора месяца рождения --> */}
																	<option value="grapefruit">Грейпфрут</option>
																	<option value="lime">Лайм</option>
																	<option value="coconut">Кокос</option>
																	<option value="mango">Манго</option>
																</select>
																<span
																	className="arrow-down"
																	htmlFor="form_user_dob_month"
																/>
															</span>
															{/* <!-- селект года --> */}
															<span className="select-container">
																<select
																	className="form-control valid"
																	id="form_user_dob_year"
																	name="yearBirth"
																	value={yearBirth}
																	onChange={onInputChange}
																>
																	{/* <!-- Опции выбора года рождения --> */}
																	<option value="grapefruit">Грейпфрут</option>
																	<option value="lime">Лайм</option>
																	<option value="coconut">Кокос</option>
																	<option value="mango">Манго</option>
																</select>
																<span className="arrow-down" htmlFor="form_user_dob_year" />
															</span>
														</div>
													</div>
													<span id="invalid-age" className="color-red hidden">
														You need to be 18 years of age to register
													</span>
												</div>
												{/* <!-- Поле выбора пола --> */}
												<span className="sex mobile-wide">
													<div className="form-group">
														<label className="required">
															<span>Пол</span>
														</label>
														<div id="form_user_sex" pattern="([0|1|2|9])">
															<input
																className="form-control"
																type="radio"
																id="form_user_sex_0"
																name="sex"
																required="required"
																defaultValue="male"
																onChange={onInputChange}
															/>
															<label htmlFor="form_user_sex_0" className="required">
																<span />Мужчина
															</label>
															<input
																className="form-control"
																type="radio"
																id="form_user_sex_1"
																name="sex"
																required="required"
																defaultValue="female"
																onChange={onInputChange}
															/>
															<label htmlFor="form_user_sex_1" className="required">
																<span />Женщина
															</label>
														</div>
														<span
															className="validator-icon form-control-feedback"
															aria-hidden="true"
														/>
													</div>
												</span>
											</section>
											
											<button
												className="btn btn-continue btn-validate-mobile btn-green"
												type="submit"
											>
												Зарегистрироваться
											</button>
										</form>

										<a>Уже есть аккаунт? Войдите</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mudal-shade registration-shade visually-hidden" />
		</Fragment>
	);
};

export default Register;
