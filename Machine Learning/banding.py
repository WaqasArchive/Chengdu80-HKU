from sklearn import linear_model
from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

df = pd.read_csv('average_credit_spending.csv')
df = df[pd.notnull(df['occupation'])]

data = df[['age', 'marital_status', 'sex', 'number_of_kids', 'occupation',
       'education_level', 'house_tenure', 'income_past12months']]
df["ratio"] = (df['avg_credit_card_spending_semi_annual'] * 2)/df['income_past12months']

# Make bands for target
target = "ratio"
#target = "avg_credit_card_spending_semi_annual"

# Get quartiles
describe = df[target].describe()

if target == "ratio":
    # Use quartlies data structure to define our own bands
    describe = {
        "25%": 0.25,
        "50%": 0.5,
        "75%": 0.75,
    }

def bands(x):
    v = x[target]
    if v < float(describe["25%"]):
        return 0
    if v < float(describe["50%"]):
        return 1
    if v < float(describe["75%"]):
        return 2
    return 3

labels = df.apply(bands, axis=1)

X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.1)

model = RandomForestClassifier(n_estimators=100, max_depth=2,random_state=0)
#model = SVC(gamma='auto')
model.fit(X_train,y_train)

print('Score: ', model.score(X_test, y_test))

# Confusion Matrix

import itertools
import numpy as np
import matplotlib.pyplot as plt

from sklearn import svm, datasets
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

# import some data to play with
iris = datasets.load_iris()
X = iris.data
y = iris.target
class_names = ["1st","2nd","3rd","4th"]

y_pred = model.predict(X_test)


def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.tight_layout()


# Compute confusion matrix
cnf_matrix = confusion_matrix(y_test, y_pred)

np.set_printoptions(precision=2)

# Plot non-normalized confusion matrix
plt.figure()
plot_confusion_matrix(cnf_matrix, classes=class_names,
                      title='Confusion matrix, without normalization')

# Plot normalized confusion matrix
plt.figure()
plot_confusion_matrix(cnf_matrix, classes=class_names, normalize=True,
                      title='Normalized confusion matrix')

plt.show()
