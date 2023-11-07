from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from base.serializers import OrderSerializer
from base.models import Product, Order, OrderItem, ShippingAddress

from rest_framework import status
from datetime import datetime


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            message = {'detail': 'Not authorized to view this order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Order does not exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(_id=pk)

        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response({"message": "Order was Paid"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    try:
        order = Order.objects.get(_id=pk)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()

        return Response({"message": "Order was Delivered"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):

    user = request.user
    orders = Order.objects.all()

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)
