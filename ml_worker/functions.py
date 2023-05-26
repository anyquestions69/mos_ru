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
    at = pd.read_csv('d.csv').drop(columns='Unnamed: 0')
    prep_at = pd.read_csv('prep_attends.csv').drop(columns='Unnamed: 0')

    nums = [i + 1 for i in range(len(at.lesson.unique()))]
    title_dict = dict(zip(nums, at.lesson.unique()))
    rows, r_pos = np.unique(prep_at.values[:, 0], return_inverse=True)

    columns, c_pos = np.unique(prep_at.values[:, 1], return_inverse=True)
    int_sparse = sparse.csr_matrix((prep_at.values[:, 2], (r_pos, c_pos)))

    pui = normalize(int_sparse, norm='l2', axis=1)
    sim = pui.T * pui

    int_sparse_T = int_sparse.transpose(copy=True)

    Piu = normalize(int_sparse_T, norm='l1', axis=1)
    fit = pui * Piu * pui
    return get_rec(id, rows, fit, int_sparse, title_dict)

