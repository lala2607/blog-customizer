import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { 
	ArticleStateType, 
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ currentState, onStateChange }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const handleOpen = () => setIsOpen(!isOpen);
	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onStateChange(formState);
	};

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState(prev => ({ ...prev, fontFamilyOption: selected }));
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState(prev => ({ ...prev, fontSizeOption: selected }));
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState(prev => ({ ...prev, fontColor: selected }));
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState(prev => ({ ...prev, backgroundColor: selected }));
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState(prev => ({ ...prev, contentWidth: selected }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside 
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form} onSubmit={handleApply}>
					{/* Заголовок формы - БОЛЬШОЙ отступ (48px) */}
					<div style={{ marginBottom: '48px' }}>
						<Text as="h2" size={31} weight={800}>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
					</div>

					{/* Шрифт - обычный отступ (24px) */}
					<div style={{ marginBottom: '24px' }}>
						<Text weight={800} size={12} uppercase>
							ШРИФТ
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							placeholder="Выберите шрифт"
						/>
					</div>
					
					{/* Размер шрифта - обычный отступ */}
					<div style={{ margin: '24px 0' }}>
						<Text weight={800} size={12} uppercase>
							РАЗМЕР ШРИФТА
						</Text>
						<RadioGroup
							name="font-size"
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
							title=""
						/>
					</div>
					
					{/* Цвет шрифта - обычный отступ */}
					<div style={{ margin: '24px 0' }}>
						<Text weight={800} size={12} uppercase>
							ЦВЕТ ШРИФТА
						</Text>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							placeholder="Выберите цвет"
						/>
					</div>
					
					{/* Separator - обычный отступ */}
					<div style={{ margin: '24px 0' }}>
						<Separator />
					</div>
					
					{/* Цвет фона - обычный отступ */}
					<div style={{ margin: '24px 0' }}>
						<Text weight={800} size={12} uppercase>
							ЦВЕТ ФОНА
						</Text>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							placeholder="Выберите цвет"
						/>
					</div>
					
					{/* Ширина контента - обычный отступ */}
					<div style={{ margin: '24px 0' }}>
						<Text weight={800} size={12} uppercase>
							ШИРИНА КОНТЕНТА
						</Text>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							placeholder="Выберите ширину"
						/>
					</div>
					
					{/* Кнопки */}
					<div className={styles.bottomContainer}>
						<Button 
							title='Сбросить' 
							htmlType='button' 
							type='clear' 
							onClick={handleReset}
						/>
						<Button 
							title='Применить' 
							htmlType='submit' 
							type='apply' 
						/>
					</div>
				</form>
			</aside>
		</>
	);
};