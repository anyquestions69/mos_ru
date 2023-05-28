import pandas as pd
import numpy as np
from scipy import sparse
from sklearn.preprocessing import normalize

def load_mx(filepath):#Функция для загрузки массивов
    return np.load(filepath, allow_pickle=True)

def get_rec(us_id, us_list, fit_mx, sparse_mx, lessons_dct):#Функция для получения рекомендаций
    ind = 0
    for i in range(len(us_list)):
        if us_list[i] == us_id:
            ind = i
            break
    initial_set = set([lessons_dct[i + 1] for i in np.nonzero(sparse_mx[ind])[1].tolist()])
    pred_set = set([lessons_dct[i + 1] for i in fit_mx[ind].toarray().argsort()[0][-30:].tolist()])
    return list(pred_set - initial_set)[:10]


def hotStart(id:int):
    users = pd.read_csv('users.csv')
    user = users[users['уникальный номер']== id]
    at = pd.read_csv('d.csv').drop(columns='Unnamed: 0')
    gender = user['пол'].tolist()
    if gender[0] == 'Женщина':
        matrix = sparse.load_npz('women_sparce.npz')
        fit = sparse.load_npz('women_fit.npz')
        prep_at = pd.read_csv('prep_attends.csv').drop(columns='Unnamed: 0')
        nums = [i + 1 for i in range(len(at.lesson.unique()))]
        title_dict = dict(zip(nums, at.lesson.unique()))
        rows, r_pos = np.unique(prep_at.values[:, 0], return_inverse=True)
        columns, c_pos = np.unique(prep_at.values[:, 1], return_inverse=True)

    else:
        matrix = sparse.load_npz('men_sparce.npz')
        fit = sparse.load_npz('women_fit.npz')
        prep_at = pd.read_csv('prep_attends.csv').drop(columns='Unnamed: 0')
        nums = [i + 1 for i in range(len(at.lesson.unique()))]
        title_dict = dict(zip(nums, at.lesson.unique()))
        rows, r_pos = np.unique(prep_at.values[:, 0], return_inverse=True)
        columns, c_pos = np.unique(prep_at.values[:, 1], return_inverse=True)

    
    return get_rec(id, rows, fit, matrix, title_dict)


def cold_start(mass: list):
    data=pd.read_csv('data_for_start.csv').drop(columns='Unnamed: 0')
    func_data = data[data.gender == mass[0]]
    lst = []
    #Первый вопрос
    if mass[1] == 'Пение':
        song = list(func_data[func_data.direction == 'Пение'].sort_values(by='quantity', ascending=False).head(3).leve3)
        lst = song
    elif mass[1] == 'Рисование':
        drawing = list(func_data[func_data.direction == 'Рисование'].sort_values(by='quantity', ascending=False).head(3).leve3)
        lst = drawing
    else:
        fp = list(func_data[func_data.direction == 'Физическая активность'].sort_values(by='quantity', ascending=False).head(3).leve3)
        lst = fp
    #Второй вопрос
    if mass[2] == 'Отправиться в поход':
        act = list(func_data[func_data['Разметка: Для ума/ Для души / Для тела'] == 'Для тела'].head(3).leve3)
        lst += act
    elif mass[2] == 'Посетить санаторий':
        act = list(func_data[func_data['Разметка: Для ума/ Для души / Для тела'] == 'Для души'].head(3).leve3)
        lst += act
    else:
        act = list(func_data[func_data['Разметка: Для ума/ Для души / Для тела'] == 'Для ума'].head(3).leve3)
        lst += act
    #Третий вопрос
    if mass[3] == 'Выпуски новостей, интеллектуальные викторины':
        act = list(func_data[func_data.direction == 'Спецпроект / Интеллектуальный клуб'].sort_values(by='quantity', ascending=False).head(3).leve3)
        lst += act
    elif mass[3] == 'Различные музыкальные, танцевальные и развлекательные шоу':
        drawing = list(func_data[func_data.direction == 'Творчество'].sort_values(by='quantity', ascending=False).head(3).leve3)
        lst += drawing
    else:
        fp = list(data[data.direction == 'Физическая активность'].sort_values(by='quantity', ascending=False).head(6).leve3)
        lst += fp
        lst = set(lst)
    return list(lst)

