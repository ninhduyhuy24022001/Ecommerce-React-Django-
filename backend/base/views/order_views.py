from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from base.serializers import OrderSerializer
from base.models import Product, Order, OrderItem, ShippingAddress

from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        message = {'detail': 'No Order Items'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address
        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shippingPrice=data['shippingPrice']
        )
        # (2) Create order items
        for orderProduct in orderItems:
            product = Product.objects.get(_id=orderProduct['product'])
            print(product)

            OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=orderProduct['qty'],
                price=orderProduct['price'],
                image=product.image.url,
            )

            # (4) Update Stock
            product.countInStock -= orderProduct['qty']
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
