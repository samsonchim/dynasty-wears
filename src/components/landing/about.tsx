export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">About Us</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              At Dynasty Departmental Wears, our mission is to provide students of Ebonyi State University with premium quality, comfortable, and stylish departmental uniforms. We believe in fostering a sense of unity and pride within the university community by ensuring every student has access to affordable and durable official attire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
