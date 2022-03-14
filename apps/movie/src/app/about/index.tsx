export const AboutPage = ({ title }: { title: string }) => <div>
  {
    Array.from({ length: 100 }, (_, i) => <p key={i}>{i}. {title} About Page</p>)
  }
</div>;

export default AboutPage;
