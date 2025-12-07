import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
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
  const formRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef: formRef,
    onChange: setIsOpen,
    onClose: () => console.log('Форма закрыта')
  });

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
        ref={formRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={handleApply}>
          <div className={styles.formTitle}>
            <Text as="h2" size={31} weight={800}>
              ЗАДАЙТЕ ПАРАМЕТРЫ
            </Text>
          </div>

          <div className={styles.formField}>
            <Select
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={handleFontFamilyChange}
              placeholder="Выберите шрифт"
              title="ШРИФТ"
              hideSelected={true}
            />
          </div>

          <div className={styles.formField}>
            <RadioGroup
              name="font-size"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={handleFontSizeChange}
              title="РАЗМЕР ШРИФТА"
            />
          </div>

          <div className={styles.formField}>
            <Select
              selected={formState.fontColor}
              options={fontColors}
              onChange={handleFontColorChange}
              placeholder="Выберите цвет"
              title="ЦВЕТ ШРИФТА"
              hideSelected={false}
            />
          </div>

          <div className={styles.separatorContainer}>
            <Separator />
          </div>

          <div className={styles.formField}>
            <Select
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={handleBackgroundColorChange}
              placeholder="Выберите цвет"
              title="ЦВЕТ ФОНА"
              hideSelected={false}
            />
          </div>
          
          <div className={styles.formField}>
            <Select
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={handleContentWidthChange}
              placeholder="Выберите ширину"
              title="ШИРИНА КОНТЕНТА"
              hideSelected={false}
            />
          </div>
          
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