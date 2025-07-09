from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data["username"], email=validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        user = get_user_model().objects.get(id=self.instance.id)
        user.set_password(validated_data["password"])
        user.username = validated_data["username"]
        user.email = validated_data["email"]
        user.save()
        return user

    def validate_email(self, value):
        if self.instance is not None and self.instance.email == value:
            return value
        if get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError("Account already exists")
        return value

    class Meta:
        model = get_user_model()
        fields = ["id", "username", "email", "password"]


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
