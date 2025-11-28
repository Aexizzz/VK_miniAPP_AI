from rest_framework import serializers


class ProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    photo_200 = serializers.CharField(allow_blank=True)


class CardItemSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    subtitle = serializers.CharField()
    cover = serializers.CharField(allow_blank=True)
    avatar = serializers.CharField(allow_blank=True, required=False, allow_null=True)
    itemLink = serializers.CharField()


class SectionSerializer(serializers.Serializer):
    slug = serializers.CharField()
    title = serializers.CharField()
    items = CardItemSerializer(many=True)
