import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faqs-section',
  imports: [MatExpansionModule],
  templateUrl: './faqs-section.html',
  styleUrl: './faqs-section.scss',
})
export class FAQSSection {
  protected readonly faqs = FAQs;
}

const FAQs: { title: string; content: string }[] = [
  {
    title: 'When is the RSVP deadline?',
    content:
      "<p>We'd greatly appreciate it if you confirm your attendance by <b>August 9, Saturday</b>.</p>",
  },
  {
    title: 'How do I get to and from the wedding venue?',
    content:
      "<p>The venues are nestled far from the city center, so bringing your own vehicle will be the most convenient way. If you don't have a vehicle, don't worry! We can help arrange transportation; just let us know so we can coordinate.</p>",
  },
  {
    title: 'Will the wedding be indoors or outdoors?',
    content:
      '<p>The wedding ceremony will be held indoors at <b>St. Michael the Archangel Chapel</b>, while the cocktail hour and reception will be outdoors at the nearby <b>Fernwood Pavilion</b>.</p>',
  },
  {
    title: 'Is there parking available near your wedding venue(s)?',
    content: '<p>Yes, parking is available for both venues.</p>',
  },
  {
    title: 'What time should I arrive for the ceremony?',
    content:
      '<p>Wedding ceremony starts at 2:00 PM; arriving 15-30 minutes ahead of schedule will give you ample time to touch up, sit back, and relax.</p>',
  },
  {
    title: 'What should I wear?',
    content: `
      <p>The dress code is <b>formal wear only</b>, with the ladies wearing their Sunday best and the gentlemen ideally in Barong Tagalog (if you're uncomfortable, a long-sleeved button-down will do!). As for the color, we have designated palettes which you can review <a href="dress-code" target="_blank" rel="noreferrer noopener" >here.</a></p>
      <p>Since both venues are located in the highlands of Eden, Toril, temperatures are expected to drop in the evening. For your comfort, feel free to bring shawls, blazers, and the like.</p>`,
  },
  {
    title: 'Can I bring a plus-one?',
    content:
      '<p>Unfortunately, due to budget and space limitations, our celebration is strictly by RSVP. We will only be able to cater to those who have confirmed.</p>',
  },
  {
    title: 'Can I bring my kid/s?',
    content:
      '<p>We can only accommodate kids listed on our wedding invitation. Since this is a celebration of love, why not treat our wedding as a date night, instead?</p>',
  },
  {
    title: 'Can I take photos and videos during the ceremony?',
    content:
      "<p>Thank you for asking; we'd greatly appreciate it if you don't. The world's so hyper-connected nowadays that we specifically chose a venue where we can all unplug and just be present.</p><p>We highly encourage you to follow church etiquette: smartphones turned off or in silent mode, securely placed in your pocket or bag. Don't worry about documentation; we have experts covering the ceremony!</p>",
  },
  {
    title: 'How about during the reception? Can I take photos and videos?',
    content:
      "<p>Of course! We'd love to see the celebration from your perspective, so please capture lots of moments. Can we request that you share these photos and videos with us too? You can upload them here.</p>",
  },
  {
    title: 'Speaking of reception, what happens there?',
    content: `
      <p>After the ceremony, the wedding party will be taking pictures nearby for about an hour. You can head straight to the Fernwood Pavilion, which is a short 5-minute drive from the church.</p><p>There, we'll be serving finger foods and beverages. You know we love our board games, so feel free to mingle while playing our favorites!</p>
      <p>We also have a photobooth, guest book, and some "fruity" tokens—make sure to snap a photo, share your blessings or messages with us, and take home Davao's best harvests!</p><p>Once we're done with photos, dinner will be served shortly.</p>`,
  },
  {
    title: 'What if I have food allergies or dietary restrictions?',
    content:
      '<p>Oh, please do let us know! Give us more details about your food allergies or dietary restrictions so we can pass them along to our food providers. SMS, social media, email—our lines are open.</p>',
  },
  {
    title: 'Are there nearby accommodations?',
    content: `
      <p>Yes! Most of the wedding party and immediate families are staying at Eden Nature Park and Resort Davao. If you'd like to stay the night there too, please let us know so we can help you book.</p>
      <p>Other accommodations we've shortlisted are:<ul><li><a href="https://www.facebook.com/p/Leigh-Haven-Vacation-Homestay-100063887300540" target="_blank" rel="noopener noreferrer">Leigh Haven Vacation Homestay</a></li><li><a href="https://www.facebook.com/hiddengardensdvo" target="_blank" rel="noopener noreferrer">Hidden Gardens Resort</a></li><li><a href="https://www.facebook.com/lolengs.spring" target="_blank" rel="noopener noreferrer">Loleng's Mountain Spring Resort</a></li></ul></p>`,
  },
  {
    title: 'Should we bring gifts?',
    content: `
      <p>Awww, that's so sweet! We've hustled together for four years and managed to purchase some essentials, but we still don't have it all.</p>
      <p>If you'd like to give a physical gift, we've created a <a href="registry" target="_blank" rel="noopener noreferrer">registry</a> for your convenience. As we start this new chapter, a monetary gift would also be a big help.</p>
      <p>Honestly, having friends and loved ones with us on our special day is the greatest gift. Thank you for taking the time to celebrate our love!</p>
    `,
  },
  {
    title: 'Anything else I need to prepare or know?',
    content: `
      <p>You're so much like the bride—she absolutely loves to prepare for every possible scenario!</p>
      <p>Well, scenario number one is signal. When we visited the area, we noticed Globe had pretty reliable service, allowing for texts, calls, and mobile data. In contrast, Smart was spotty. You might experience limited cell service while celebrating with us.</p>
      <p>Since we'll be outdoors for most of the night, bring insect repellent lotion and other essentials. You might also want to wear comfortable shoes and bring cozy shawls and outerwear because throughout the reception, we'll have mini-games!</p>
      <p>In fact, we'll be capping off the celebration with a good ol' Trivia Night. So bring your A-game—we have great prizes up for grabs.</p>
      <p>We hope you'll have a wonderful time celebrating with us. See you soon!</p>
    `,
  },
  {
    title:
      'I have questions/concerns that are not in this FAQ. What should I do?',
    content:
      "<p>We're here for you! Please send us a message via social media or text (0945776445) and we'll help you.</p>",
  },
];
