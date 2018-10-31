from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from api.models import Note
class NoteResource(ModelResource):
    class Meta:
        queryset = Note.objects.all()
        resource_name = 'note'
        authorization = Authorization()