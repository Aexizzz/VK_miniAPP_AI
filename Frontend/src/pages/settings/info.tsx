// Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import {Icon24InfoCircleOutline } from '@vkontakte/icons';

export default function InfoPage() {
  return (
    <>
        <NavigationBar title='Информация'/>
        <RowHeader
          title='Информация'
          subtitle='Всё, что нужно знать о приложении'
          showIcon
          Icon=<Icon24InfoCircleOutline/>
        />

        <p>
          «Ритм» — это персональное пространство для музыки, рекомендаций и анализа вкусов. Мы стремимся сделать взаимодействие музыкой проще, умнее и ближе к вам. Настраивайте интерфейс под себя, следите за статистикой прослушиваний и  рекомендации, созданные именно под ваш стиль.
        </p>
    </>
  );
};