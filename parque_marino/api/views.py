from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import users
from .serializers import UsersSerializer

# Create your views here.
#Catgeorias crear
class UsersListCreateView(ListCreateAPIView):
    #permission_classes=[IsAdminUserGroup,IsAuthenticated]
    queryset = users.objects.all()
    serializer_class = UsersSerializer

#borrar,editar "caegoria"
class UsersDetailView(RetrieveUpdateDestroyAPIView):
    #permission_classes=[IsAdminUserGroup,IsAuthenticated]
    queryset = users.objects.all()
    serializer_class = UsersSerializer