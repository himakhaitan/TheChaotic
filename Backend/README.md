---
description: The Chaotic Backend Build
---

# API Docs

### CONFIGURATION

PORT by Default : 8000

Base URL : http://localhost:8000

### ENDPOINT REFERENCE

<table>
 <thead>
    <tr>
      <th style="text-align:left">Endpoint</th>
      <th style="text-align:left">Method</th>
      <th style="text-align:left">Request</th>
      <th style="text-align:left">Response</th>
    </tr>
  </thead>
<tbody>
<tr>
      <td style="text-align:left">/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>status: &quot;online&quot;,</p>
        <p>host: &quot;localhost:8000&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/</td>
      <td style="text-align:left">POST</td>
      <td style="text-align:left">
        <p>{</p>
        <p>email: &quot;String&quot;,</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>Message: &quot;String&quot;</p>
        <p>}</p>
      </td>
    </tr>
</tbody>
</table>
