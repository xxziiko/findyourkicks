import type { OrderSheetResponse } from '@/app/api/checkout/[id]/route';
import { confirmOrder } from '@/lib/api';
import { isAllCheckedAgreementAtom } from '@/lib/store';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export interface ConfirmOrderPayload {
  orderSheetId: string;
  paymentMethod: string;
  userAddressId: string;
  deliveryInfo?: {
    alias?: string;
    receiverName?: string;
    receiverPhone?: string;
    address?: string;
    message?: string;
  };
  termsAgreed: boolean;
}

interface ConfirmOrderResponse {
  orderId: string;
  orderName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerMobilePhone: string;
}

// const MOCK_ADDRESS = null;

export default function useCheckout(orderSheet: OrderSheetResponse) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //TODO: 배송 메시지 입력 기능 추가
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const isAllCheckedAgreement = useAtomValue(isAllCheckedAgreementAtom);
  const conditionalTitle = !orderSheet.deliveryInfo ? '주소 입력' : '주소 변경';
  const totalPrice = orderSheet.orderSheetItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalPriceWithDeliveryFee = totalPrice + 3000;

  const { mutate: mutateOrderItems } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: (response) => {
      const paymentRequestBody = {
        ...response,
        orderName:
          orderSheet.orderSheetItems.length === 1
            ? orderSheet.orderSheetItems[0].title
            : `${orderSheet.orderSheetItems[0].title} 외 ${orderSheet.orderSheetItems.length - 1}건`,
        amount: totalPriceWithDeliveryFee,
      };

      requestPayment(paymentRequestBody);
    },
  });

  const handlePayment = () => {
    const payload = {
      orderSheetId: orderSheet.orderSheetId,
      paymentMethod: 'card',
      userAddressId: orderSheet.deliveryInfo.addressId,
      deliveryInfo: { message: deliveryMessage },
      termsAgreed: isAllCheckedAgreement,
    };

    console.log('payload', payload);
    mutateOrderItems(payload);
  };

  // ------  SDK 초기화 ------
  const clientKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_CUSTOMER_KEY;

  async function requestPayment({
    orderId,
    orderName,
    amount,
    customerEmail,
    customerName,
    customerMobilePhone,
  }: ConfirmOrderResponse) {
    const tossPayments = await loadTossPayments(clientKey);
    const payment = tossPayments.payment({ customerKey });

    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    //TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.

    await payment.requestPayment({
      method: 'CARD', // 카드 결제
      amount: {
        currency: 'KRW',
        value: amount,
      },
      orderId,
      orderName,
      customerEmail,
      customerMobilePhone,
      customerName,
      successUrl: `${window.location.origin}/complete`, // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: `${window.location.origin}/fail`, // 결제 요청이 실패하면 리다이렉트되는 URL

      // 카드 결제에 필요한 정보
      card: {
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  }

  const handleModal = () => setIsModalOpen((prev) => !prev);

  return {
    conditionalTitle,
    totalPrice,
    totalPriceWithDeliveryFee,
    isModalOpen,
    isAllCheckedAgreement,
    handleModal,
    handlePayment,
  };
}
