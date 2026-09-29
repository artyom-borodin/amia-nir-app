export const TEXT_EMPTY = 'Нет данных'
export const TEXT_ACTIONS = 'Действия'
export const TEXT_EDIT = 'Изменить'
export const TEXT_DELETE = 'Удалить'
export const TEXT_SAVE = 'Сохранить'
export const TEXT_CANCEL = 'Отмена'
export const TEXT_CREATE_RECORD = 'Добавить запись'
export const TEXT_EDIT_RECORD = 'Редактирование записи'
export const TEXT_ADD_RECORD = 'Добавление записи'
export const TEXT_FIND = 'Найти'
export const TEXT_RESET = 'Сброс'
export const TEXT_ALL = 'Все'
export const TEXT_SEARCH_ALL = 'Поиск по всем полям'
export const TEXT_SHOW_FILTERS = 'Показать все фильтры'
export const TEXT_HIDE_FILTERS = 'Скрыть фильтры'
export const TEXT_CONFIRM_TITLE = 'Подтверждение'
export const TEXT_CHECK_FORM = 'Проверьте форму'
export const TEXT_SAVED = 'Сохранено'
export const TEXT_CREATED = 'Создано'
export const TEXT_TABLE_NOT_FOUND = 'Таблица не найдена'
export const TEXT_TABLE_FALLBACK = 'Таблица'
export const TEXT_REPORT_NOT_FOUND = 'Отчёт не найден'
export const TEXT_DEFAULT_RECORD = 'Запись'
export const TEXT_CHOOSE = 'Выберите'
export const TEXT_DATE_PLACEHOLDER = 'ДД.ММ.ГГГГ'

export const TEXT_DRILL_HINT = 'Нажмите на цифру, чтобы раскрыть список записей.'
export const TEXT_REPORT_IDLE = 'Нажмите Сформировать чтобы получить отчёт.'
export const TEXT_TOTALS = 'Итоги'
export const TEXT_DRILL_TITLE = 'Детализация'
export const TEXT_METRIC = 'Показатель'
export const TEXT_COUNT = 'Количество'

export const TEXT_YEAR_PLACEHOLDER = 'ГГГГ'
export const TEXT_DAY = 'День'
export const TEXT_MONTH = 'Месяц'
export const TEXT_PERIOD_PLACEHOLDER = 'Период'

export const TEXT_PERIOD_LABEL = 'Период'
export const TEXT_CALENDAR_YEAR_LABEL = 'Календарный год'
export const TEXT_QUARTER_LABEL = 'Квартал'
export const TEXT_PERIOD_START_LABEL = 'Начало'
export const TEXT_PERIOD_RANGE_LABEL = 'Диапазон'
export const TEXT_PERIOD_FROM_LABEL = 'С'
export const TEXT_PERIOD_TO_LABEL = 'По'
export const TEXT_STUDY_YEAR_LABEL = 'Учебный год'
export const TEXT_FIVE_YEAR_PLACEHOLDER = 'ГГГГ-ГГГГ'
export const TEXT_DATE_PLACEHOLDER_SHORT = 'Дата'
export const TEXT_STUDY_YEAR_PLACEHOLDER = '2025/2026'
export const TEXT_LEARNER_REQUIRED =
  'Выберите обучающегося: курсанта, студента или слушателя ФПК / магистранта (ровно одного)'

export const TEXT_TABLES = 'Таблицы'
export const TEXT_REPORTS = 'Отчёты'

export const TEXT_LOGIN_TITLE = 'Вход'
export const TEXT_LOGIN = 'Логин'
export const TEXT_PASSWORD = 'Пароль'
export const TEXT_SIGN_IN = 'Войти'

export const TEXT_ADD_HINT =
  'Создать новую запись в справочнике (откроется в новой вкладке). Выбранное значение сохраняется автоматически'
export const TEXT_EVENT_DATE = 'Дата проведения'
export const TEXT_FOUNDER = 'Учредитель'
export const TEXT_CITY = 'Город проведения'

export const TEXT_GENERATE = 'Сформировать'
export const TEXT_EXPORT_XLSX = 'Экспорт в Excel'
export const TEXT_COURSE_WORD = 'курс'

export const TEXT_APP_TITLE = 'База данных учёта научно-исследовательской работы обучающихся'
export const TEXT_MENU = 'Меню'
export const TEXT_HOME = 'Главная'
export const TEXT_LOGOUT = 'Выйти'
export const TEXT_COLLAPSE_MENU = 'Свернуть меню'
export const TEXT_SHOW_MENU = 'Показать меню'
export const TEXT_RESIZE_HINT = 'Потяните, чтобы изменить ширину (двойной клик - сбросить)'

export const TEXT_YES = 'Да'
export const TEXT_NO = 'Нет'

export function formatRowFallback(idx) {
  return 'Строка ' + (idx + 1)
}

export function formatDeleteConfirm(label) {
  return TEXT_DELETE + ' ' + label + '?'
}

export const TEXT_TITLE_PLACEHOLDER = 'Полное название'
export const TEXT_ORG_PLACEHOLDER = 'Название организации'
export const TEXT_CIRCLE_PLACEHOLDER = 'Название научного сообщества (кружка)'
export const TEXT_GROUP_PLACEHOLDER = 'Название группы'
export const TEXT_YEAR_OR_STUDY_YEAR_PLACEHOLDER = 'ГГГГ или ГГГГ/ГГГГ, напр. 2025 или 2025/2026'

export const TEXT_MONTH_DAY_HINT = 'День 01 означает указан только месяц'

export const TEXT_ADD_FOUNDER = 'Добавить учредителя'
export const TEXT_ADD_CONFERENCE = 'Добавить конференцию'
export const TEXT_ADD_CONTEST = 'Добавить конкурс'

export const TEXT_MSG_COURSE_REQUIRED = 'Выберите курс на момент участия'
export const TEXT_MSG_SUPERVISOR_REQUIRED = 'Выберите научного руководителя (ППС кафедры)'
export const TEXT_MSG_DEPARTMENT_REQUIRED = 'Выберите кафедру'
export const TEXT_MSG_EVENT_DATE_REQUIRED = 'Укажите дату проведения'
export const TEXT_MSG_FOUNDER_REQUIRED = 'Выберите учредителя'
export const TEXT_MSG_CITY_REQUIRED = 'Укажите город проведения'
export const TEXT_MSG_CIRCLE_REQUIRED = 'Выберите научное сообщество (кружок)'
export const TEXT_MSG_WORK_TITLE_REQUIRED = 'Укажите название работы'
export function requiredTitleMsg(entity) {
  return 'Укажите название ' + entity
}
export const TEXT_MSG_INTEGER = 'Введите целое число от '

export const TEXT_YEAR_CALENDAR = 'Год (календарный)'
