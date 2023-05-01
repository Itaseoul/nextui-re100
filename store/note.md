## 구분
## store/atoms
## store/actions

로 구분하는 것은 좋은 redux 나 context reducer  상태관리 레거시의  핵심사고의 차용이다. 

값과 액션이 사실 같은 atom이지만, 편의상 구분하고 있습니다. 이 둘을 묶은 용어를 고민하다가, Redux, MobX 등에서 쓰는 store라고 부르기로 했습니다. (ViewModel이라고 부를까도 고민했습니다.)

MobX에서 값과 액션을 한 클래스로 만들면 파일을 나누기가 어려운데 반해, Jotai는 atom의 모음이다 보니 나누기가 편리합니다. 값은 atoms 디렉토리, 액션은 actions 디렉토리에 둡니다. atoms는 연관성이 높은 것들을 한 파일로 묶고, 액션은 보통 길이가 길기 때문에 액션 별로 파일을 만들고 있습니다.


