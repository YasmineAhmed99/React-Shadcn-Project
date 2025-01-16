import React from 'react';
import visa from '../assets/visa.png';
import { Button } from "@/components/ui/button";

interface CardData {
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  brand: string;
}

const BankCard: React.FC = () => {
  const [cardData, setCardData] = React.useState<CardData | null>(null);

  React.useEffect(() => {
    fetch('https://www.bakarcompany.somee.com/api/IssueCard/get-card-data')
      .then(res => res.json())
      .then(data => setCardData(data))
  }, []);

  return (
    <>
      <div className="card p-5 flex flex-col">
        <img className="card-pic w-[70px]" src={visa} alt="Visa" />
        <div className='card-num text-lg mt-5'>**** **** **** {cardData?.last4}</div>
        <div className='mt-6'>
          <div className='card-information'>
            <div>Cardholder</div>
            <div>Expiry date</div>
            <div>CVC</div>
          </div>
          <div className='card-information'>
            <div>Jenny Rosen</div>
            <div><span>{cardData?.expiryMonth}</span>/<span>{cardData?.expiryYear}</span></div>
            <div>{cardData?.cvc}</div>
          </div>
        </div>
      </div>

      <div className='info-section'>
        <div className='keys'>
          <div>Card number</div>
          <div>CVV</div>
          <div>Expiration</div>
          <div>Brand</div>
          <div>Status</div>
          <div>Cardholder</div>
          <div>Card type</div>
          <div>Created at</div>
          <div>Billing address</div>
        </div>

        <div className='values'>
          <div><span>**** **** **** </span>{cardData?.last4}</div>
          <div>{cardData?.cvc}</div>
          <div><span>{cardData?.expiryMonth}</span>/<span>{cardData?.expiryYear}</span></div>
          <div>{cardData?.brand} <img className='visa-value' src={visa} alt="Visa" /></div>
          <div><Button className='status-value' variant="outline">Active</Button></div>
          <div>Jenny Rosen</div>
          <div>Virtual</div>
          <div>Nov 15, 2023, 9:32 PM</div>
          <div>123 Main Street</div>
          <div>San Francisco, CA, 94111, US</div>
        </div>
      </div>

      <div className='options'>
        <Button variant="outline">Freeze Card</Button>
        <Button variant="outline">Replace Card</Button>
        <Button variant="outline">Cancel Card</Button>
      </div>
    </>
  );
};

export default BankCard;
