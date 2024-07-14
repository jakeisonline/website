import StepperField from "@/components/stepper-field"

export default function StepperPage() {
  return (
    <main className="container flex-1">
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={0} fieldLabelReader="Quantity" />
        <pre className="mt-1">
          <code className="text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={0} minNum={0} maxNum={10} stepShiftSize={10} />
        <pre className="mt-1">
          <code className="text-slate-800 text-xs">
            &lt;StepperField &nbsp;&nbsp;
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;10&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={100} minNum={-99} maxNum={100} />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;startNum=&#123;100&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;-99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField
          fieldId="sizes_medium"
          fieldName="sizes_medium"
          fieldLabel="M"
          fieldLabelReader="Medium"
          startNum={100}
          minNum={-99}
          maxNum={100}
        />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;fieldId=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabelReader=&#123;&#34;Medium&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;100&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;-99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <div className="flex gap-3">
          <StepperField
            collapsible={true}
            hideBadgeNum={0}
            fieldId="sizes_small"
            fieldName="sizes_small"
            fieldLabel="S"
            fieldLabelReader="Small"
            startNum={0}
            minNum={0}
            maxNum={100}
          />
          <StepperField
            collapsible={true}
            hideBadgeNum={0}
            fieldId="sizes_med"
            fieldName="sizes_medium"
            fieldLabel="M"
            fieldLabelReader="Medium"
            startNum={3}
            minNum={0}
            maxNum={100}
          />
          <StepperField
            collapsible={true}
            hideBadgeNum={0}
            fieldId="sizes_large"
            fieldName="sizes_large"
            fieldLabel="L"
            fieldLabelReader="Large"
            startNum={0}
            minNum={0}
            maxNum={100}
          />
        </div>
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            3 *
            <br />
            &lt;StepperField
            <br />
            &nbsp;&nbsp;collapsible=&#123;true&#125;
            <br />
            &nbsp;&nbsp;hideBadgeNum=&#123;&#34;0&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldId=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;sizes_medium&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabelReader=&#123;&#34;Medium&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;100&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
    </main>
  )
}
