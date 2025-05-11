<div align="center">
<img width="474" alt="Image" src="https://github.com/user-attachments/assets/97ad32e6-adb1-41d5-9b19-818e0641a7e6" />
</div>


<br/>
<br/>

<br/>
<br/>

>신발 커머스의 실제 사용자 흐름을 구현한 토이 프로젝트입니다. <br/>
>Next.js App Router와 Supabase를 활용하여 **상품 탐색부터 주문까지**의 구매 흐름을 클라이언트 중심으로 설계했습니다.
<br/>

> 현재 이 프로젝트는 사용자 앱(`apps/shop`)과 관리자 앱(`apps/admin`)을 모노레포 구조로 함께 관리하기 위해 이전되었습니다. <br/>
> 전체 레포는 [findyourkicks-workspace GitHub Repository](https://github.com/xxziiko/findyourkicks-workspace)에서 확인할 수 있습니다.

<br/>

## 프로젝트 개요
본 프로젝트에서는 다음과 같은 기술적/도메인적 목표를 중심으로 구현을 진행했습니다.

1.  Next.js App Router와 Tanstack Query를 학습하고 적용하는 것
2.  커머스 도메인에 대한 구조적 이해
3.  React 컴포넌트 추상화와 선언적 프로그래밍 방식에 대한 고민
4.  렌더링 성능 및 사용자 경험 개선에 대한 고민

상품 탐색부터 장바구니, 주문, 결제까지의 전 과정을 **사용자 관점의 흐름으로 설계**하고,  
이를 기반으로 실제 도메인 데이터 모델과 API 구조를 직접 설계하며 기술적인 이해를 확장하고자 했습니다.

<br/>

#### 보러가기
🔗 https://findyourkicks.vercel.app/

#### 작업기간
2025.02 ~ 2025.05

#### 기술스택
- **Frontend**: `Next.js (App Router)`, `TypeScript`, `SCSS`
- **State Management**: `Tanstack Query`, `jotai`
- **Backend**: `Supabase (Auth, DB, Storage)`
- **Deployment**: `Vercel`


<br/>

## 주요 기능
- 상품 목록/상세 페이지
- 장바구니 담기 / 주문하기
- 배송지 입력 및 관리
- 주문 내역 조회

<br/>


## 폴더구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┣ 📂(order-flow)
 ┃ ┣ 📂(shop)
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┣ 📂order-sheets
 ┃ ┃ ┣ 📂orders
 ┃ ┃ ┣ 📂payments
 ┃ ┃ ┣ 📂products
 ┃ ┃ ┗ 📂users
 ┣ 📂features
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂hooks
 ┃ ┣ 📂cart
 ┃ ┣ 📂order
 ┃ ┣ 📂order-sheet
 ┃ ┣ 📂payment
 ┃ ┣ 📂product
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📂address
 ┗ 📂shared
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┣ 📂hooks
 ┃ ┣ 📂styles
 ┃ ┗ 📂utils
```

<br/>

## 페이지
|메인 페이지|상세 페이지|
|----|----|
|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/b1f1ab76-c23d-4296-aaa3-ff5d3c5e1f8f" />|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/460ae79e-da93-4ce5-a40c-838b8112e6fd" />|

|로그인 페이지|장바구니 페이지|
|----|----|
|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/665dd1f1-20bd-4e31-ac0f-dea4bba582aa" />|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/a541d0bc-8414-48ae-8640-61387d26434c" />|

|주문 페이지|결제 페이지|
|----|----|
| <img width="100%" alt="Image" src="https://github.com/user-attachments/assets/0b99240f-9744-429d-b419-b52b7e61247b" />|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/04a8cbb7-ebf4-4d5a-8a34-1b0703d92080" />

|결제완료 페이지|주문 내역|
|---|---|
|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/621301e5-5d9b-451e-986e-c1bfeb0f11fa" />|<img width="100%" alt="Image" src="https://github.com/user-attachments/assets/9806f841-430f-4877-ab72-dcfc4deca2d7" />|

<br/>


## ERD
![Image](https://github.com/user-attachments/assets/9bdb543f-e414-4cab-ba9b-71f1cbfbcc4d)



### ERD 설계 요약

- 실제 커머스 도메인 흐름을 기반으로 사용자, 상품, 장바구니, 주문, 배송, 결제까지 전반적인 데이터 구조를 설계했습니다. 
- 재고 관리, 주문 확정 전 단계 구분 등 실무 상황을 고려한 테이블 구조를 설계했고, Supabase View를 통해 복잡한 조인 쿼리도 추상화하여 프론트엔드 응답 구조를 간결하게 구성했습니다.

**주요 설계 포인트**
- **OAuth + 커스텀 유저 테이블 분리**  
  소셜 로그인 기반 사용자 인증 + 확장 가능한 사용자 정보 저장

- **재고(Inventory) 테이블 분리**  
  상품 옵션(사이즈 등)을 독립적으로 관리하여 정확한 재고 관리 가능

- **주문 전 단계(OrderSheet)와 실제 주문(Order) 분리**  
  사용자 UX 관점에서 검토/수정 가능한 주문 준비 단계 확보

- **UserAddress 정규화 및 is_default 필드 도입**  
  여러 배송지를 저장하고, 기본 배송지 지정 가능

<br/>



